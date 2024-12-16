export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_SERVER_ERROR'
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error
  }

  console.error('Unhandled error:', error)
  return new AppError(
    'An unexpected error occurred',
    500,
    'INTERNAL_SERVER_ERROR'
  )
}

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS'),
  SESSION_EXPIRED: new AppError('Session expired', 401, 'SESSION_EXPIRED'),
  UNAUTHORIZED: new AppError('Unauthorized', 401, 'UNAUTHORIZED'),
} as const 