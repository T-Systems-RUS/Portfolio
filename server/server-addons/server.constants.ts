/**
 * Enum for string parameters in server.ts config
 * For usage in server-addons
 * @export
 * @enum {number}
 */
export enum ServerConstants {
    API_PREFIX = '/api',
    DEFAULT_PORT = '3000',
    DEFAULT_INDEX_PATH = 'dist/index.html',
    DEFAULT_STATIC_PATH = 'dist',
    IMAGES_ROUTE = '/server/images',
    IMAGES_PATH = 'server/images',
    PORT_ALIAS = 'port',
    MAX_REQUEST_SIZE = '10mb'
}
