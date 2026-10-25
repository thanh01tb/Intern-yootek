const REQUIRED_ENV = ['PORT', 'DATABASE_URL', 'JWT_SECRET'];

export function validateEnv(config: Record<string, unknown>) {
    const missing = REQUIRED_ENV.filter((key) => !config[key]) ;
    if(missing.length  > 0) {
        throw new Error(`Thiếu biến môi trường: ${missing.join(', ')}`);
    }
    return config;
}