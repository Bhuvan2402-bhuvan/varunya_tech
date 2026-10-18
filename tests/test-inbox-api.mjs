// Automated Test Suite for VarunyaTech Messages & Inbox Module
// Run against local dev server on port 5000 or staging on port 3006

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:5000';
console.log(`Starting VarunyaTech Inbox & Messages API Test Suite on: ${BASE_URL}\n`);

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  FAIL: ${testName} ${details ? '- ' + details : ''}`);
    failedTests++;
  }
}

async function runTests() {
  let createdLeadId = null;
  let createdMessageId = null;

  // -------------------------------------------------------------
  // Test 1: Inbound Contact / Lead Submission creates Lead & Message atomically
  // -------------------------------------------------------------
  console.log('[Test Suite 1: Inbound Public Submissions]');
  try {
    const res = await fetch(`${BASE_URL}/api/v1/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Dr. Gregory House',
        email: `gregory.${Date.now()}@princeton-plainsboro.org`,
        company: 'Diagnostics Dept',
        phone: '+1-555-0199',
        serviceNeeded: 'Enterprise Healthcare Platform',
        budgetRange: '$25,000 - $50,000',
        projectScope: 'Need high-throughput clinical diagnostic pipeline with real-time patient record streaming and strict HIPAA isolation.',
        source: 'CONTACT_FORM',
        subject: 'Diagnostic Pipeline Engineering',
      }),
    });

    const data = await res.json();
    assert(res.status === 201, 'POST /api/v1/leads returns 201 Created');
    assert(data.success === true, 'POST /api/v1/leads returns success: true');
    assert(typeof data.leadId === 'string', 'POST /api/v1/leads returns leadId');
    assert(typeof data.messageId === 'string', 'POST /api/v1/leads returns linked messageId');

    createdLeadId = data.leadId;
    createdMessageId = data.messageId;
  } catch (err) {
    assert(false, 'POST /api/v1/leads network/execution error', err.message);
  }

  // -------------------------------------------------------------
  // Test 2: Validation rejection on malformed public request
  // -------------------------------------------------------------
  try {
    const res = await fetch(`${BASE_URL}/api/v1/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'X', // Invalid: too short
        email: 'not-an-email',
        projectScope: 'short', // Invalid: too short
      }),
    });

    assert(res.status === 400, 'POST /api/v1/leads rejects invalid input with 400');
    const data = await res.json();
    assert(data.success === false, 'POST /api/v1/leads returns success: false on validation error');
  } catch (err) {
    assert(false, 'Validation test error', err.message);
  }

  // -------------------------------------------------------------
  // Test 3: Unauthenticated access to /api/v1/messages is rejected
  // -------------------------------------------------------------
  console.log('\n[Test Suite 2: Authentication & Role-Based Authorization]');
  try {
    const res = await fetch(`${BASE_URL}/api/v1/messages`);
    assert(res.status === 401, 'Unauthenticated GET /api/v1/messages rejected with 401 Unauthorized');
  } catch (err) {
    assert(false, 'Unauthenticated test error', err.message);
  }

  // -------------------------------------------------------------
  // Test 4: Role-based gating (Role without permission is forbidden)
  // -------------------------------------------------------------
  try {
    const res = await fetch(`${BASE_URL}/api/v1/messages`, {
      headers: { 'X-Staff-Token': 'token_DEVELOPER' },
    });
    assert(res.status === 403, 'DEVELOPER role lacks clearance for messages -> 403 Forbidden');
  } catch (err) {
    assert(false, 'Role gating test error', err.message);
  }

  // -------------------------------------------------------------
  // Test 5: Authorized staff access (ADMIN / MANAGER / SALES)
  // -------------------------------------------------------------
  try {
    const res = await fetch(`${BASE_URL}/api/v1/messages`, {
      headers: { 'X-Staff-Token': 'token_ADMIN' },
    });
    assert(res.status === 200, 'ADMIN role granted access to GET /api/v1/messages (200 OK)');
    const data = await res.json();
    assert(data.success === true, 'Response contains success: true');
    assert(Array.isArray(data.messages), 'Response contains messages array');
    assert(typeof data.counts?.unread === 'number', 'Response contains telemetry counts (unread, all, etc.)');
  } catch (err) {
    assert(false, 'Authorized access test error', err.message);
  }

  // -------------------------------------------------------------
  // Test 6: Unread count endpoint
  // -------------------------------------------------------------
  console.log('\n[Test Suite 3: Messages Operations & Mutations]');
  try {
    const res = await fetch(`${BASE_URL}/api/v1/messages/unread-count`, {
      headers: { 'X-Staff-Token': 'token_ADMIN' },
    });
    assert(res.status === 200, 'GET /api/v1/messages/unread-count returns 200');
    const data = await res.json();
    assert(typeof data.unreadCount === 'number', 'Returns numeric unreadCount');
  } catch (err) {
    assert(false, 'Unread count test error', err.message);
  }

  // -------------------------------------------------------------
  // Test 7: Retrieve single message detail
  // -------------------------------------------------------------
  if (createdMessageId) {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/messages/${createdMessageId}`, {
        headers: { 'X-Staff-Token': 'token_ADMIN' },
      });
      assert(res.status === 200, `GET /api/v1/messages/${createdMessageId} returns 200`);
      const data = await res.json();
      assert(data.message?.id === createdMessageId, 'Returned message matches requested ID');
      assert(data.message?.leadId === createdLeadId, 'Returned message is linked to created lead');
      assert(data.message?.subject === 'Diagnostic Pipeline Engineering', 'Message subject is preserved');
    } catch (err) {
      assert(false, 'Message detail test error', err.message);
    }

    // -------------------------------------------------------------
    // Test 8: Mark message as read
    // -------------------------------------------------------------
    try {
      const res = await fetch(`${BASE_URL}/api/v1/messages/${createdMessageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Staff-Token': 'token_ADMIN',
        },
        body: JSON.stringify({ isRead: true }),
      });
      assert(res.status === 200, 'PATCH /api/v1/messages/:id marks message as read');
      const data = await res.json();
      assert(data.message?.isRead === true, 'Message isRead property is now true');
      assert(data.message?.readBy?.includes('Marcus Vance'), 'readBy records Marcus Vance (ADMIN)');
    } catch (err) {
      assert(false, 'Mark read test error', err.message);
    }

    // -------------------------------------------------------------
    // Test 9: Update workflow status and assignment
    // -------------------------------------------------------------
    try {
      const res = await fetch(`${BASE_URL}/api/v1/messages/${createdMessageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Staff-Token': 'token_ADMIN',
        },
        body: JSON.stringify({
          status: 'IN_PROGRESS',
          assignedTo: 'Sarah Jenkins (MANAGER)',
        }),
      });
      assert(res.status === 200, 'PATCH /api/v1/messages/:id updates status and assignee');
      const data = await res.json();
      assert(data.message?.status === 'IN_PROGRESS', 'Message status updated to IN_PROGRESS');
      assert(data.message?.assignedTo === 'Sarah Jenkins (MANAGER)', 'Assignee updated correctly');
    } catch (err) {
      assert(false, 'Status update test error', err.message);
    }

    // -------------------------------------------------------------
    // Test 10: Append confidential staff note
    // -------------------------------------------------------------
    try {
      const res = await fetch(`${BASE_URL}/api/v1/messages/${createdMessageId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Staff-Token': 'token_ADMIN',
        },
        body: JSON.stringify({
          content: 'Confirmed discovery call with Dr. House. Requires high availability architecture proposal.',
        }),
      });
      assert(res.status === 201, 'POST /api/v1/messages/:id/notes creates note (201 Created)');
      const data = await res.json();
      assert(typeof data.note?.id === 'string', 'Returns generated note ID');
      assert(data.note?.authorName === 'Marcus Vance', 'Note author is Marcus Vance');
      assert(data.note?.authorRole === 'ADMIN', 'Note author role is ADMIN');
    } catch (err) {
      assert(false, 'Note append test error', err.message);
    }

    // -------------------------------------------------------------
    // Test 11: Verify note is returned in message detail
    // -------------------------------------------------------------
    try {
      const res = await fetch(`${BASE_URL}/api/v1/messages/${createdMessageId}`, {
        headers: { 'X-Staff-Token': 'token_ADMIN' },
      });
      const data = await res.json();
      assert(Array.isArray(data.message?.notes), 'Message detail includes notes array');
      assert(data.message?.notes?.length > 0, 'Notes array contains appended note');
      assert(
        data.message?.notes[0]?.content.includes('Confirmed discovery call'),
        'Note content matches expected text'
      );
    } catch (err) {
      assert(false, 'Note retrieval test error', err.message);
    }
  }

  // -------------------------------------------------------------
  // Test Summary
  // -------------------------------------------------------------
  console.log('\n=============================================');
  console.log(`Test Execution Finished: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('=============================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests();
