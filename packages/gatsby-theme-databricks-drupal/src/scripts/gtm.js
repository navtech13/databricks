export const gtmHead = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.setAttributeNode(d.createAttribute('data-ot-ignore'));j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.GATSBY_GTM_ID}');`

export const gtmBody = `<iframe data-cookieconsent="statistics" src="https://www.googletagmanager.com/ns.html?id=${process.env.GATSBY_GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`
