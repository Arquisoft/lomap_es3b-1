const esModules = ['@react-leaflet', 'react-leaflet'].join('|');

export default {
    transform: {
        "^.+\.tsx?$": "ts-jest",
        "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "babel-jest"
    },
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
}