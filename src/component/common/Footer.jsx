const FooterComponent = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 fixed bottom-0 w-full">
            <div className="container mx-auto text-center">
                <span>
                    Velvet Horizon Hotel | All Rights Reserved &copy; {new Date().getFullYear()}
                </span>
            </div>
        </footer>
    );
};

export default FooterComponent;