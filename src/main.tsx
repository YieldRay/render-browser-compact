import bcd from '@mdn/browser-compat-data' with { type: 'json' };
import satori from 'satori'

async function loadGoogleFont(font: string, text?: string) {
    const url = new URL("https://fonts.googleapis.com/css2")
    url.searchParams.set("family", font)
    if (text) url.searchParams.set("text", text)
    const css = await (await fetch(url)).text()
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

    if (resource) {
        const response = await fetch(resource[1])
        if (response.status == 200) {
            return await response.arrayBuffer()
        }
    }

    throw new Error(`failed to load font data`)
}

async function handler(req: Request) {
    const compact = bcd.css.properties.background.__compat!
    const { support, status, tags } = compact


    const jsx = <div tw="flex flex-col">
        <div tw="flex flex-row">
            {tags?.map(tag => <div key={tag}>{tag}</div>)}
        </div>

        <div tw="flex">
            {Object.entries(support!).map(([name, data]) => <div tw="flex">
                <div style={{ display: 'flex', height: '250px', width: '32px', transform: 'rotate(270deg)' }}>{name}</div>
                <div style={{ display: 'flex', width: '32px', transform: 'translateY(200px)' }}>{(data as any).version_added}</div>
            </div>)}
        </div>
    </div>

    const svg = await satori(
        jsx,
        {
            width: 800,
            height: 600,
            fonts: [
                {
                    name: 'Roboto',
                    data: await loadGoogleFont('Roboto'),
                    style: 'normal',
                },
            ],
        },
    )
    return new Response(svg, { headers: { 'content-type': 'image/svg+xml' } })
}

Bun.serve({ fetch: handler })