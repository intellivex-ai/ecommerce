export const handleError = (error) => {
    console.error('[Error]:', error);
    // Log to external service here if needed, e.g. Sentry or Firebase Crashlytics

    if (error?.message) {
        return error.message;
    }
    return 'An unexpected error occurred. Please try again.';
};
