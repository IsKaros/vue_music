// import {getArtist} from './tools'
export default class Song {
  constructor({id, name, duration, artist,albumId, albumCover, alias, songCover,mv}) {
    this.id = id
    this.name = name
    this.duration = duration
    this.artistName = getArtist(artist)
    this.albumId = albumId
    this.albumCover = albumCover
    this.alias = getAlias(alias)
    this.songCover = songCover
    this.mv = mv
  }
}
function getAlias(arr) {
  var result = ''
  for(let item of arr){
    result += item
  }
  return result
}
function getArtist(arr) {
  var artistName = ''
  arr.forEach((item, index) => {
    if (index !== 0) {
      artistName += '/'
    }
    artistName += item.name
  })
  return artistName
}