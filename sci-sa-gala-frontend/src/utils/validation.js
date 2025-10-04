/**
 * Validation utilities for SCI-SA Gala
 * Client-side validation for forms and inputs
 */

/**
 * Validates ticket number format (M followed by 3 digits)
 * @param {string} ticketNumber - Ticket number to validate
 * @returns {boolean} - True if valid
 */
export const validateTicketNumber = (ticketNumber) => {
  const ticketRegex = /^M\d{3}$/;
  return ticketRegex.test(ticketNumber);
};

/**
 * Validates student number format (exactly 9 digits)
 * @param {string} studentNumber - Student number to validate
 * @returns {boolean} - True if valid
 */
export const validateStudentNumber = (studentNumber) => {
  const studentRegex = /^\d{9}$/;
  return studentRegex.test(studentNumber);
};

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates required field
 * @param {string} value - Value to validate
 * @returns {boolean} - True if not empty
 */
export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Gets validation error message for ticket number
 * @param {string} ticketNumber - Ticket number to validate
 * @returns {string|null} - Error message or null if valid
 */
export const getTicketNumberError = (ticketNumber) => {
  if (!validateRequired(ticketNumber)) {
    return 'Ticket number is required';
  }
  if (!validateTicketNumber(ticketNumber)) {
    return 'Ticket number must be M followed by 3 digits (e.g., M123)';
  }
  return null;
};

/**
 * Gets validation error message for student number
 * @param {string} studentNumber - Student number to validate
 * @returns {string|null} - Error message or null if valid
 */
export const getStudentNumberError = (studentNumber) => {
  if (!validateRequired(studentNumber)) {
    return 'Student number is required';
  }
  if (!validateStudentNumber(studentNumber)) {
    return 'Student number must be exactly 9 digits';
  }
  return null;
};

/**
 * Validates sell ticket form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export const validateSellTicketForm = (formData) => {
  const errors = {};
  
  const ticketError = getTicketNumberError(formData.ticketNumber);
  if (ticketError) errors.ticketNumber = ticketError;
  
  const studentError = getStudentNumberError(formData.studentNumber);
  if (studentError) errors.studentNumber = studentError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
