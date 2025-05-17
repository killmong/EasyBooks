import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const socialMediaLinks = [
  { url: "https://facebook.com", icon: <FaFacebookF />, name: "Facebook" },
  { url: "https://instagram.com", icon: <FaInstagram />, name: "Instagram" },
  { url: "https://twitter.com", icon: <FaTwitter />, name: "Twitter" },
  { url: "https://linkedin.com", icon: <FaLinkedinIn />, name: "LinkedIn" },
  { url: "https://youtube.com", icon: <FaYoutube />, name: "YouTube" },
];

const SocialLinks = () => {
  return (
    <div className="social-links">
      <h5 className="pd1 text-2xl">Follow Us on:</h5>
      <div className="icon-group">
        {socialMediaLinks.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className="social-icon-link"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
