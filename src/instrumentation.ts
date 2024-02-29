export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { firebaseAdminConnection } = await import(
      './services/firebase-connection.instrumentation'
    );
    firebaseAdminConnection();
  }
}
