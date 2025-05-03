export type Project = {
    id: number
    title: string
    image: string
    position: [number, number, number]
    rotation: [number, number, number]
    size: [number, number, number]
  }
  
  export type FloorProps = {
    position: [number, number, number]
    image: string
    title: string
  }