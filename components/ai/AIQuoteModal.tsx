"use client";

import React from "react";
import { ConsultationModal } from "@/components/consultation/ConsultationModal";

interface AIQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Replaced AI automated estimator with 1-on-1 Consultation & Discovery Call services
 */
export function AIQuoteModal({ isOpen, onClose }: AIQuoteModalProps) {
  return <ConsultationModal isOpen={isOpen} onClose={onClose} />;
}
