import Song from './song'
export default function initializeSongs(list) {
  let result = []
  let booksArr = list
  booksArr.forEach(item => {
    let book = new Song({
      id: item.id,
      name: item.name,
      duration: item.dt || '',
      artist: item.ar || '',
      albumId: item.al.id || '',
      albumCover: item.al.picUrl,
      alias: item.alia || '',
      songCover: item.al.picUrl || '',
      mv: item.mv || 0
    })
    result.push(book)
  })
  return result
}
