export function switchTabs(body:HTMLElement) {
    const tabs = body.querySelectorAll('main')
    for (const tab of tabs) {
        if (!tab.classList.contains('tab-active')) {
            console.log(tab.id)
            tab.classList.add('tab-active')
            tab.classList.remove('hidden')
            if (tab.nextElementSibling && tab.nextElementSibling.localName == 'main') {
                tab.nextElementSibling.classList.add('hidden')
                tab.nextElementSibling.classList.remove('tab-active')
                return
            } else{
                tab?.previousElementSibling?.classList.remove('tab-active')
                tab?.previousElementSibling?.classList.add('hidden')
                return
            }
        }
    }   
}