import Browser from "webextension-polyfill"

function getCsp(details: Browser.WebRequest.OnHeadersReceivedDetailsType) {
    let val = `default-src 'none'; base-uri 'self'; block-all-mixed-content; child-src github.com/assets-cdn/worker/ gist.github.com/assets-cdn/worker/; connect-src 'self' uploads.github.com objects-origin.githubusercontent.com www.githubstatus.com collector.github.com raw.githubusercontent.com api.github.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com cdn.optimizely.com logx.optimizely.com/v1/events *.actions.githubusercontent.com wss://*.actions.githubusercontent.com online.visualstudio.com/api/v1/locations github-production-repository-image-32fea6.s3.amazonaws.com github-production-release-asset-2e65be.s3.amazonaws.com insights.github.com wss://alive.github.com; font-src github.githubassets.com; form-action 'self' github.com gist.github.com objects-origin.githubusercontent.com; frame-ancestors 'none'; frame-src render.githubusercontent.com viewscreen.githubusercontent.com notebooks.githubusercontent.com; img-src 'self' data: github.githubassets.com identicons.github.com github-cloud.s3.amazonaws.com secured-user-images.githubusercontent.com/ github-production-user-asset-6210df.s3.amazonaws.com customer-stories-feed.github.com spotlights-feed.github.com *.githubusercontent.com; manifest-src 'self'; media-src *; script-src github.githubassets.com; style-src 'unsafe-inline' github.githubassets.com; worker-src github.com/assets-cdn/worker/ gist.github.com/assets-cdn/worker/`
    const newCsp = {name: 'content-security-policy', value: val}
    if (details.url.split('/').includes('github.com')) {
        let index: number = 0
        if (!details.responseHeaders) {
            return
        }
        for (let i = 0; i < details.responseHeaders.length; i++) {
            let header = details.responseHeaders[i]
            if (header.name === "content-security-policy") {
                index = i
            }
        }
        details.responseHeaders[index] = newCsp
    }
    return {
        responseHeaders: details.responseHeaders
    }
}

export function changeHeaders(): void {
    Browser.webRequest.onHeadersReceived.addListener(
        getCsp,
        { urls: ["<all_urls>"] },
        ["blocking", "responseHeaders"]
    )
}
