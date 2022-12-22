const SecondaryFooter = () => {
    return (
        <div className="secondary-footer bg-[#002F34] py-5 md:py-6">
            <div className="link-footer mx-auto max-w-6xl xl md:flex md:justify-between md:items-center pl-3 md:px-6 lg:px-32 xl:px-4">
                <div className="copyright-footer">
                    <p className="text-white text-sm">2020 © All rights reserved</p>
                </div>
                <div className="linkicon-footer space-x-3">
                    <a href=""><i className="fa fa-facebook-official text-white text-xl" aria-hidden="true" /></a>
                    <a href=""><i className="fa fa-youtube text-white text-xl" aria-hidden="true" /></a>
                    <a href=""><i className="fa fa-linkedin-square text-white text-xl" aria-hidden="true" /></a>
                    <a href=""><i className="fa fa-envelope text-white text-xl" aria-hidden="true" /></a>
                </div>
            </div>
        </div>
    )
}

export default SecondaryFooter;