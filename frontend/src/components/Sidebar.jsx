const Sidebar = ({ screens, selected, onSelect }) => {
    return (
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Flowbit</h2>
        <ul>
          {screens.map((screen) => (
            <li
              key={screen}
              className={`mb-2 cursor-pointer p-2 rounded ${
                selected === screen ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`}
              onClick={() => onSelect(screen)}
            >
              {screen.charAt(0).toUpperCase() + screen.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Sidebar;
  