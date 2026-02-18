const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`container m-auto `}>
            <div className="px-5 lg:p-0 py-5">
                {children}
            </div>
        </div>
    )
}

export default Layout