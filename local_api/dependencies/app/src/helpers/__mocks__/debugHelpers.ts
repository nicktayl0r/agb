const mockDebugHelpers = require.requireActual("@/helpers/debugHelpers");

mockDebugHelpers.isDebug = () => true;
mockDebugHelpers.logInfo = (message: string, ...optionalParams: any[]) => { };
mockDebugHelpers.logMessage = (message: string, ...optionalParams: any[]) => { };
mockDebugHelpers.logWarning = (message: string, ...optionalParams: any[]) => { };
mockDebugHelpers.logError = (message: string, ...optionalParams: any[]) => { };
mockDebugHelpers.gizmoLogSecurely = (message: string, ...optionalParams: any[]) => { };
mockDebugHelpers.logWarningSecurely = (message: string, ...optionalParams: any[]) => { };
mockDebugHelpers.logErrorSecurely = (error: string, ...optionalParams: any[]) => { };

module.exports = mockDebugHelpers;
