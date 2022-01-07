
export default function DesignSystem() {
  return (
    <div>
      <main>
        <h1 className='text-3xl font-bold'>Design System</h1>
        <section>
          <h2>Typography</h2>
          <p className='font-sans'>Typeface used is used is Nunito Sans, with a number of weights:</p>
          <ul>
            <li>Regular</li>
            <li>Light</li>
            <li>Semibold</li>
            <li>Bold</li>
            <li>Extrabold</li>
          </ul>
          <h1>This is a headline element at 33px</h1>
          <h2>This is a subtitle at 16px</h2>
          <p>This is body text at 16px</p>
          <h2>This ia sidebar title</h2>
          <a href='bink.com'>This is a Hyperlink</a>
          <a href='bink.com'>This is a visited Hyperlink</a>
          <p>This is error text at 14pt</p>
        </section>
      </main>
    </div>
  )
}
