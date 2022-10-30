const Body = ({ urls }) => {
    return (
        <tbody>
            {
                urls.map((url) => {
                    return (
                        <tr key={url.code}> 
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    <a rel="noreferrer"  href={url.code} target="_blank">{url.code}</a>
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    <a  rel="noreferrer" href={url.url} target="_blank">{url.url}</a>
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                {url.createdAt}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                {url.expireAt}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span
                                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span aria-hidden
                                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                    <span className="relative"> {!url.revoke ? "Active" : "Expired"}</span>
                                </span>
                            </td>
                        </tr>
                    )
                })
            }

        </tbody>
    )
}

export default Body