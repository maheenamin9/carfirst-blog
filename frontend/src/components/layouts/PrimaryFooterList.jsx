const PrimaryFooterList = () => {
    const primaryFooterList = ['Contact', 'Blog', 'Privacy Policy', 'Code of Business Ethics and Conduct',
        'FAQs', 'Required documents', 'Terms and conditions', 'About us', 'Careers']

    return (
        <ul className="space-y-2 md:w-1/2">
            {primaryFooterList.map((listItem, index) => <li key={index}><a href="">{listItem}</a></li>)}
        </ul>
    )
}

export default PrimaryFooterList;