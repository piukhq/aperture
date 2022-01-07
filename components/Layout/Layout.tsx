import Link from 'next/link'

export default function Layout({children}){
  return (
    <>
      <nav className='bg-binkGreen'>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/design">
              <a>Design</a>
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
      <main>
        {children}
      </main>
    </>
  );
}