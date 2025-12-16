try {
    const { MercadoPagoConfig, Preference } = require('mercadopago');
    console.log('MercadoPagoConfig:', typeof MercadoPagoConfig);
    console.log('Preference:', typeof Preference);

    if (!MercadoPagoConfig || !Preference) {
        throw new Error("Imports are undefined!");
    }

    const client = new MercadoPagoConfig({ accessToken: 'TEST-123' });
    console.log("Client created successfully");

} catch (e) {
    console.error("IMPORT ERROR:", e);
    process.exit(1);
}
