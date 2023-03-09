export type Location = {
    Type: String,
    License: String,
    bbox: {
        0: String,
        1: String,
        2: String,
        3: String,
    }
    features: {
        [
        Id: string,
        geometry: {
            coordinates: {
                0: String,
                1: String,
            }
        },
        properties: {
            address: string,
            distance: string,
            region: string,
            county: string,
            label: string,
        }
        ]
    }
};