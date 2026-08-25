import { useEffect } from "react";
const SEO = ({ title, description, url }) => {
    useEffect(() => {
        document.title = title;

        const setMeta = (attrName, attrValue, content) => {
            let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);

            if (!tag) {
                tag = document.createElement("meta");
                tag.setAttribute(attrName, attrValue);
                document.head.appendChild(tag);
            }

            tag.setAttribute("content", content);
        };

        setMeta("name", "description", description);
        setMeta("property", "og:title", title);
        setMeta("property", "og:description", description);
        setMeta("property", "og:url", url);
    }, [title, description, url]);

    return null;
};

export default SEO;