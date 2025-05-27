export default function TopNavbarClient() {
  return (
    <header className="border-b border-black/5 sticky top-0">
      <nav>
        <div className="container mx-auto">
          <div className="flex justify-between items-center px-6 py-4">
            <h3 className="font-semibold text-lg">Logo</h3>

            <div className="cursor-pointer">
              <img
                className="w-10 h-10 rounded-full bg-white"
                src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
