
function Footer() {
    return (
        <div className="flex justify-around">
            <div className="grid grid-cols-4 gap-4 bg-green-500 w-full bg-opacity-20">
                <div className="p-4 col-span-2">
                    <h2 className="text-left font-extrabold">Gathering Globe</h2>
                    <p className="text-left">Welcome to our vibrant community platform!  Unleash your inner rockstar at electrifying concerts, or dive deep into new skills with our engaging workshops. Whether you're a social butterfly or a curious mind, there's something for everyone.  Here, you can connect with like-minded individuals, share your passions, and forge friendships that last a lifetime.  So, come on in, explore, and get ready to create unforgettable experiences that will leave you wanting more!</p>
                </div>
                <div className="p-4">
                    <h2 className="text-left font-extrabold">Categories</h2>
                    <p className="text-left">Music</p>
                    <p className="text-left">Sports</p>
                    <p className="text-left">Academic</p>
                    <p className="text-left">Craft</p>
                    <p className="text-left">Health</p>
                    <p className="text-left">Beauty</p>
                </div>
                <div className="p-4">
                    <h2 className="text-left font-extrabold">Explore</h2>
                    <p className="text-left">See tickets</p>
                    <p className="text-left">See events</p>
                    <p className="text-left">Track events</p>
                    <p className="text-left">Join Groups</p>
                    <p className="text-left">Find friends</p>
                </div>
                <div className="p-4">
                </div>
            </div>
        </div>
    )
}

export default Footer;