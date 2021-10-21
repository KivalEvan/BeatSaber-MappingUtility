export function round(num: number, d: number = 0): number {
    if (!(d > 0)) {
        return Math.round(num);
    }
    return Math.round(num * Math.pow(10, d)) / Math.pow(10, d);
}

export function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const radToDeg = (x: number) => {
    return x * (180 / Math.PI);
};

export const degToRad = (x: number) => {
    return x * (Math.PI / 180);
};
