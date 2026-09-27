"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface TimezoneOption {
  id: string; // IANA identifier, e.g. "America/New_York"
  label: string;
  city: string;
  region: "Americas" | "Europe" | "Asia & Pacific" | "Middle East & Africa" | "Universal";
  code: string;
  utcOffset: string;
}

export const AVAILABLE_TIMEZONES: TimezoneOption[] = [
  // Universal
  { id: "UTC", label: "Coordinated Universal Time", city: "UTC / Zulu", region: "Universal", code: "UTC", utcOffset: "+00:00" },
  
  // Americas
  { id: "America/New_York", label: "Eastern Time (US & Canada)", city: "New York, Toronto, Miami", region: "Americas", code: "EST / EDT", utcOffset: "-05:00" },
  { id: "America/Chicago", label: "Central Time (US & Canada)", city: "Chicago, Dallas, Houston", region: "Americas", code: "CST / CDT", utcOffset: "-06:00" },
  { id: "America/Denver", label: "Mountain Time (US & Canada)", city: "Denver, Phoenix, Salt Lake", region: "Americas", code: "MST / MDT", utcOffset: "-07:00" },
  { id: "America/Los_Angeles", label: "Pacific Time (US & Canada)", city: "San Francisco, Los Angeles, Seattle", region: "Americas", code: "PST / PDT", utcOffset: "-08:00" },
  { id: "America/Anchorage", label: "Alaska Time", city: "Anchorage", region: "Americas", code: "AKST", utcOffset: "-09:00" },
  { id: "Pacific/Honolulu", label: "Hawaii-Aleutian Time", city: "Honolulu", region: "Americas", code: "HST", utcOffset: "-10:00" },
  { id: "America/Sao_Paulo", label: "Brasília Time", city: "São Paulo, Rio de Janeiro", region: "Americas", code: "BRT", utcOffset: "-03:00" },

  // Europe
  { id: "Europe/London", label: "Greenwich Mean Time / British Summer Time", city: "London, Dublin, Lisbon", region: "Europe", code: "GMT / BST", utcOffset: "+00:00" },
  { id: "Europe/Paris", label: "Central European Time", city: "Paris, Berlin, Rome, Madrid, Amsterdam", region: "Europe", code: "CET / CEST", utcOffset: "+01:00" },
  { id: "Europe/Athens", label: "Eastern European Time", city: "Athens, Helsinki, Bucharest", region: "Europe", code: "EET / EEST", utcOffset: "+02:00" },
  { id: "Europe/Moscow", label: "Moscow Standard Time", city: "Moscow, St. Petersburg", region: "Europe", code: "MSK", utcOffset: "+03:00" },

  // Asia & Pacific
  { id: "Asia/Kolkata", label: "India Standard Time", city: "New Delhi, Mumbai, Bengaluru, Hyderabad", region: "Asia & Pacific", code: "IST", utcOffset: "+05:30" },
  { id: "Asia/Dubai", label: "Gulf Standard Time", city: "Dubai, Abu Dhabi, Muscat", region: "Middle East & Africa", code: "GST", utcOffset: "+04:00" },
  { id: "Asia/Singapore", label: "Singapore Time", city: "Singapore, Kuala Lumpur", region: "Asia & Pacific", code: "SGT", utcOffset: "+08:00" },
  { id: "Asia/Hong_Kong", label: "Hong Kong Time", city: "Hong Kong, Beijing, Shanghai", region: "Asia & Pacific", code: "HKT / CST", utcOffset: "+08:00" },
  { id: "Asia/Tokyo", label: "Japan Standard Time", city: "Tokyo, Osaka, Seoul (KST)", region: "Asia & Pacific", code: "JST", utcOffset: "+09:00" },
  { id: "Australia/Sydney", label: "Australian Eastern Time", city: "Sydney, Melbourne, Brisbane", region: "Asia & Pacific", code: "AEST / AEDT", utcOffset: "+10:00" },
  { id: "Australia/Perth", label: "Australian Western Time", city: "Perth", region: "Asia & Pacific", code: "AWST", utcOffset: "+08:00" },
  { id: "Pacific/Auckland", label: "New Zealand Standard Time", city: "Auckland, Wellington", region: "Asia & Pacific", code: "NZST", utcOffset: "+12:00" },

  // Middle East & Africa
  { id: "Africa/Johannesburg", label: "South Africa Standard Time", city: "Johannesburg, Cape Town", region: "Middle East & Africa", code: "SAST", utcOffset: "+02:00" },
  { id: "Africa/Cairo", label: "Eastern European Time (Egypt)", city: "Cairo", region: "Middle East & Africa", code: "EET", utcOffset: "+02:00" },
  { id: "Asia/Riyadh", label: "Arabia Standard Time", city: "Riyadh, Doha, Kuwait City", region: "Middle East & Africa", code: "AST", utcOffset: "+03:00" },
];

export type TimeFormatType = "12h" | "24h";
export type DateFormatType = "YYYY-MM-DD" | "DD/MM/YYYY" | "MM/DD/YYYY" | "MMM DD, YYYY";

export interface TimezoneSettings {
  primaryTimezone: string;
  secondaryTimezone: string;
  timeFormat: TimeFormatType;
  showSeconds: boolean;
  dateFormat: DateFormatType;
  officeHoursStart: string;
  officeHoursEnd: string;
  operatingDays: string;
  headlineBadgeText: string;
  showOnHomepage: boolean;
}

interface TimezoneContextType {
  settings: TimezoneSettings;
  primaryTimezone: string;
  secondaryTimezone: string;
  timeFormat: TimeFormatType;
  showSeconds: boolean;
  dateFormat: DateFormatType;
  officeHoursStart: string;
  officeHoursEnd: string;
  operatingDays: string;
  headlineBadgeText: string;
  showOnHomepage: boolean;
  currentTime: Date;
  isModalOpen: boolean;
  isAgencyOnline: boolean;
  setPrimaryTimezone: (tz: string) => void;
  setSecondaryTimezone: (tz: string) => void;
  setTimeFormat: (fmt: TimeFormatType) => void;
  setShowSeconds: (show: boolean) => void;
  setDateFormat: (fmt: DateFormatType) => void;
  updateSettings: (newSettings: Partial<TimezoneSettings>) => void;
  openModal: () => void;
  closeModal: () => void;
  autoDetectTimezone: () => void;
  formatTime: (date?: Date | string | number, tz?: string) => string;
  formatDate: (date?: Date | string | number, tz?: string) => string;
  formatDateTime: (date?: Date | string | number, tz?: string) => string;
  getTimezoneDetails: (tzId: string) => TimezoneOption;
}

export const TIMEZONE_STORAGE_KEY = "velocity_timezone_settings";

export const DEFAULT_TIMEZONE_SETTINGS: TimezoneSettings = {
  primaryTimezone: "America/New_York",
  secondaryTimezone: "UTC",
  timeFormat: "12h",
  showSeconds: true,
  dateFormat: "MMM DD, YYYY",
  officeHoursStart: "09:00",
  officeHoursEnd: "18:00",
  operatingDays: "Mon – Fri",
  headlineBadgeText: "HQ LIVE TIME",
  showOnHomepage: true,
};

export function getStoredTimezoneSettings(): TimezoneSettings {
  if (typeof window === "undefined") return DEFAULT_TIMEZONE_SETTINGS;
  try {
    const saved = localStorage.getItem(TIMEZONE_STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_TIMEZONE_SETTINGS, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error("Failed to read timezone settings", e);
  }
  return DEFAULT_TIMEZONE_SETTINGS;
}

const TimezoneContext = createContext<TimezoneContextType | undefined>(undefined);

export function TimezoneProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<TimezoneSettings>(DEFAULT_TIMEZONE_SETTINGS);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize from localStorage and sync across tabs
  useEffect(() => {
    const loaded = getStoredTimezoneSettings();
    setSettings(loaded);

    const handleSync = () => {
      setSettings(getStoredTimezoneSettings());
    };
    window.addEventListener("timezone-updated", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("timezone-updated", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  // Update live clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const saveSettings = (updated: TimezoneSettings) => {
    setSettings(updated);
    try {
      localStorage.setItem(TIMEZONE_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("timezone-updated"));
    } catch (e) {
      console.error("Failed to save timezone settings", e);
    }
  };

  const updateSettings = (newSettings: Partial<TimezoneSettings>) => {
    saveSettings({ ...settings, ...newSettings });
  };

  const setPrimaryTimezone = (tz: string) => {
    updateSettings({ primaryTimezone: tz });
  };

  const setSecondaryTimezone = (tz: string) => {
    updateSettings({ secondaryTimezone: tz });
  };

  const setTimeFormat = (timeFormat: TimeFormatType) => {
    updateSettings({ timeFormat });
  };

  const setShowSeconds = (showSeconds: boolean) => {
    updateSettings({ showSeconds });
  };

  const setDateFormat = (dateFormat: DateFormatType) => {
    updateSettings({ dateFormat });
  };

  const autoDetectTimezone = () => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detected) {
        setPrimaryTimezone(detected);
      }
    } catch (e) {
      console.error("Could not detect timezone", e);
    }
  };

  const getTimezoneDetails = (tzId: string): TimezoneOption => {
    const found = AVAILABLE_TIMEZONES.find(t => t.id === tzId);
    if (found) return found;
    return {
      id: tzId,
      label: tzId,
      city: tzId.split("/").pop()?.replace(/_/g, " ") || tzId,
      region: "Universal",
      code: tzId.split("/").pop()?.slice(0, 4).toUpperCase() || "TZ",
      utcOffset: ""
    };
  };

  const formatTime = (dateInput?: Date | string | number, tz?: string): string => {
    const d = dateInput ? new Date(dateInput) : currentTime;
    const targetTz = tz || settings.primaryTimezone;

    try {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: targetTz,
        hour: "numeric",
        minute: "2-digit",
        hour12: settings.timeFormat === "12h",
      };
      if (settings.showSeconds) {
        options.second = "2-digit";
      }
      return new Intl.DateTimeFormat("en-US", options).format(d);
    } catch (e) {
      return d.toLocaleTimeString();
    }
  };

  const formatDate = (dateInput?: Date | string | number, tz?: string): string => {
    const d = dateInput ? new Date(dateInput) : currentTime;
    const targetTz = tz || settings.primaryTimezone;

    try {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: targetTz,
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short"
      }).format(d);
      return parts;
    } catch (e) {
      return d.toLocaleDateString();
    }
  };

  const formatDateTime = (dateInput?: Date | string | number, tz?: string): string => {
    const timeStr = formatTime(dateInput, tz);
    const dateStr = formatDate(dateInput, tz);
    return `${dateStr} • ${timeStr}`;
  };

  // Determine if Agency is currently within office hours in its primary timezone
  const checkIsAgencyOnline = (): boolean => {
    try {
      const timeStr24 = new Intl.DateTimeFormat("en-US", {
        timeZone: settings.primaryTimezone,
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).format(currentTime);

      const [curHour, curMin] = timeStr24.split(":").map(Number);
      const curMinutesTotal = (curHour || 0) * 60 + (curMin || 0);

      const [startHour, startMin] = (settings.officeHoursStart || "09:00").split(":").map(Number);
      const startMinutesTotal = (startHour || 0) * 60 + (startMin || 0);

      const [endHour, endMin] = (settings.officeHoursEnd || "18:00").split(":").map(Number);
      const endMinutesTotal = (endHour || 0) * 60 + (endMin || 0);

      return curMinutesTotal >= startMinutesTotal && curMinutesTotal <= endMinutesTotal;
    } catch (e) {
      return true;
    }
  };

  const isAgencyOnline = checkIsAgencyOnline();

  return (
    <TimezoneContext.Provider
      value={{
        settings,
        primaryTimezone: settings.primaryTimezone,
        secondaryTimezone: settings.secondaryTimezone,
        timeFormat: settings.timeFormat,
        showSeconds: settings.showSeconds,
        dateFormat: settings.dateFormat,
        officeHoursStart: settings.officeHoursStart,
        officeHoursEnd: settings.officeHoursEnd,
        operatingDays: settings.operatingDays,
        headlineBadgeText: settings.headlineBadgeText,
        showOnHomepage: settings.showOnHomepage,
        currentTime,
        isModalOpen,
        isAgencyOnline,
        setPrimaryTimezone,
        setSecondaryTimezone,
        setTimeFormat,
        setShowSeconds,
        setDateFormat,
        updateSettings,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
        autoDetectTimezone,
        formatTime,
        formatDate,
        formatDateTime,
        getTimezoneDetails,
      }}
    >
      {children}
    </TimezoneContext.Provider>
  );
}

export function useTimezone() {
  const context = useContext(TimezoneContext);
  if (!context) {
    throw new Error("useTimezone must be used within a TimezoneProvider");
  }
  return context;
}
