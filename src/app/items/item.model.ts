export class Item {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public price: number,
        public imagesPath: string[],
        public category: string,
        public qty?: number,
    ){}
}