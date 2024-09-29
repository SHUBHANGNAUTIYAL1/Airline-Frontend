import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

/*const routes = [
  { from: "Chennai", to: "Mumbai", code: "MAA-BOM", img: "https://th.bing.com/th/id/OIP.l3rZmv55E6mhsilaRDrUuwHaEK?rs=1&pid=ImgDetMain" },
  { from: "Delhi", to: "Ahmedabad", code: "DEL-AMD", img: "https://www.tripsavvy.com/thmb/pAlZ4kx0tM9HFLmgkYbqMlfxaok=/2116x1417/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-846359134-5b515328c9e77c003738e40c.jpg" },
  { from: "Delhi", to: "Lucknow", code: "DEL-LKO", img: "https://www.theindianwire.com/wp-content/uploads/2014/07/20140705-120540-43540606.jpg" },
  { from: "Mumbai", to: "Chennai", code: "BOM-MAA", img: "https://www.fabhotels.com/blog/wp-content/uploads/2018/09/Gateway-of-India-1.jpg" },
  { from: "Mumbai", to: "Dubai", code: "BOM-DXB", img: "https://images.musement.com/cover/0002/45/dubai-skyline-at-dusk-jpg_header-144981.jpeg?&q=60&fit=crop" },
  { from: "Mumbai", to: "Kolkata", code: "BOM-CCU", img: "https://static2.tripoto.com/media/transfer/img/OgData/1500874108_victoria_memorial_hall_kolkata.jpg" },
  { from: "Hyderabad", to: "Bangalore", code: "HYD-BLR", img: "https://deih43ym53wif.cloudfront.net/bangalore-india-shutterstock_662210488_ac0dd8543d.jpeg" },
  { from: "Mumbai", to: "Jaipur", code: "BOM-JAI", img: "https://th.bing.com/th/id/R.c241e4794f946090d819daea128d0bfb?rik=40ctn3ux79no1g&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f39600000%2fHawa-Mahal-Palace-in-Jaipur-travel-39643277-1680-948.jpg&ehk=8UHjrDhp0pw9Lj1Q49eFZdr7yTyNotPNI7tJXPuFbwQ%3d&risl=&pid=ImgRaw&r=0" },
  { from: "Delhi", to: "Dubai", code: "DEL-DXB", img: "https://www.itl.cat/pngfile/big/146-1460571_dubai-city-of-skyscrapers-tall-buildings-night-light.jpg" },
];*/

const routes = [
  { from: "Auckland", to: "Wellington", code: "AKL-WLG", img: "https://a.cdn-hotels.com/gdcs/production169/d1777/f6e2ce38-5276-4429-a4e1-a79947606630.jpg" },
  { from: "Auckland", to: "Christchurch", code: "AKL-CHC", img: "https://th.bing.com/th/id/OIP.udFT5f124gYwl3SF3hycmwHaE8?rs=1&pid=ImgDetMain" },
  { from: "Wellington", to: "Queenstown", code: "WLG-ZQN", img: "https://th.bing.com/th/id/OIP.y1T85HwMNdb7mrab-duJHwHaE8?rs=1&pid=ImgDetMain" },
  { from: "Christchurch", to: "Auckland", code: "CHC-AKL", img: "https://th.bing.com/th/id/OIP.udFT5f124gYwl3SF3hycmwHaE8?rs=1&pid=ImgDetMain" },
  { from: "Auckland", to: "Dunedin", code: "AKL-DUD", img: "https://www.distantjourneys.co.uk/wp-content/uploads/2016/05/Dunedin-Railway-Station-Central-Otago-David-Wall.jpeg" },
  { from: "Wellington", to: "Rotorua", code: "WLG-ROT", img: "https://th.bing.com/th/id/R.d6b8adff205f70d72f62dda2a0f637c3?rik=%2fgdAvDWsi77OXg&riu=http%3a%2f%2fwww.wallpapers13.com%2fwp-content%2fuploads%2f2016%2f03%2fRotorua-is-located-on-the-shores-of-Lake-Rotorua-and-it-is-considered-the-heart-of-the-North-Island-of-New-Zealand..jpg&ehk=sSD6mEmzlD5ZefVW6nkZ2nF%2b1y%2fLSTvXlzgT8F2pIRI%3d&risl=&pid=ImgRaw&r=0" },
  { from: "Queenstown", to: "Auckland", code: "ZQN-AKL", img: "https://media.timeout.com/images/105241459/image.jpg" },
  { from: "Christchurch", to: "Wellington", code: "CHC-WLG", img: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/179000/179180-Wellington.jpg" },
  { from: "Dunedin", to: "Wellington", code: "DUD-WLG", img: "https://th.bing.com/th/id/OIP.sJXQg2GckVl6NWISR33nRgAAAA?rs=1&pid=ImgDetMain" },
];


const TopFlightRoutes = () => {
  return (
    <div className="container mx-auto py-10 bg-white rounded-xl px-10">
      <h2 className="text-3xl font-bold mb-8 flex items-center">
        <span className="text-green-500">✈️</span> Other Flight Routes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {routes.map((route, index) => (
          <div key={index} className="flex items-center space-x-4">
            <img
              src={route.img}
              alt={`${route.from} to ${route.to}`}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <div className="text-lg font-semibold">{route.from} ↔ {route.to}</div>
              <div className="text-blue-500">{route.code}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg p-4 flex items-center space-x-4">
          <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 w-12 h-12" />
          <div>
            <h3 className="font-bold">Important Info:</h3>
            <p className="text-sm">
              To cancel/claim refund or reschedule/modify your booking.
              <a href="#" className="text-blue-500">Click here...</a>
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg p-4 flex items-center space-x-4">
          <FontAwesomeIcon icon={faMapMarkedAlt} className="text-green-500 w-12 h-12" />
          <div>
            <h3 className="font-bold">Travel Guide:</h3>
            <p className="text-sm">
              Get the latest information on airlines & airports guidelines, state-wise quarantine rules, travel checklists, etc.
              <a href="#" className="text-blue-500">Click here...</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFlightRoutes;
