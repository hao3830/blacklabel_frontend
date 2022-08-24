import type { NextPage } from 'next'
import Header from 'next/head'
import HomePage from '../src/components/HomePage'
const Home: NextPage = () => {
  return (
    <>
      <Header>
        <title>Black label | Home</title>
      </Header>
      <HomePage />
    </>
  )
}

export default Home
