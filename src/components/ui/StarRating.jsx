import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

export default function StarRating({ rating = 5, size = 'text-lg' }) {
  const numRating = Number(rating) || 0
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= numRating) {
      stars.push(<FaStar key={i} className={`text-yellow-400 ${size}`} />)
    } else if (i - 0.5 <= rating) {
      stars.push(<FaStarHalfAlt key={i} className={`text-yellow-400 ${size}`} />)
    } else {
      stars.push(<FaRegStar key={i} className={`text-yellow-400 ${size}`} />)
    }
  }
  return <div className="flex gap-1">{stars}</div>
}
