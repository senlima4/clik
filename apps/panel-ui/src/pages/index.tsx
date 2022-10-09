import Link from "next/link"
import type { NextPage } from "next"

const Home: NextPage = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/register">register</Link>
        </li>
        <li>
          <Link href="/auth">auth</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
