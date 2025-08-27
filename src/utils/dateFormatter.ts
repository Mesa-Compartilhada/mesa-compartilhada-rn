export default function dateFormatter(date: string) {
    try {
        let d = date.split("-")[2] + "/" + date.split("-")[1] + "/" + date.split("-")[0]
        return d
    } catch(error) {
        console.warn(error)
    }
}