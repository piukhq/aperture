import Link from 'next/link'

export default function Layout({children}){
  return (
    <>
      <main>
        <nav>
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
        {children}
      </main>
    </>
  );
}