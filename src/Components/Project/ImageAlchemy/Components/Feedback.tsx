import { useState, useEffect } from 'react';
import { Rate, Button, message, Input } from 'antd'; // Import Input from Ant Design
import { CloseOutlined, FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons'; // Import close icon
import emailjs from '@emailjs/browser';
const FeedbackComponent = () => {
  const [rating, setRating] = useState(0); // State for the rating
  const [feedback, setFeedback] = useState(''); // State for the feedback text
  const [email, setEmail] = useState(''); // State for the email input
  const [isVisible, setIsVisible] = useState(true); // State to control visibility
  const [location, setLocation] = useState({ country: '', city: '' }); // State for location data
  useEffect(() => {
    fetch('https://ipinfo.io/json?token=4309fe7500df37') // Replace with your token
      .then((response) => response.json())
      .then((data) => {
        setLocation({
          country: data.country,
          city: data.city,
        });
      })
      .catch(() => {
        console.error('Failed to fetch location data');
      });
  }, []);
  // Check local storage on component mount
  useEffect(() => {
    const isFeedbackClosed = localStorage.getItem('feedbackClosed');
    if (isFeedbackClosed === 'true') {
      setIsVisible(false); // Hide the feedback component if it was previously closed
    }
  }, []);

  const handleSubmit = () => {
    if (rating === 0) {
      message.warning('Please provide a rating before submitting.');
      return;
    }
    if (feedback.trim() === '') {
      message.warning('Please provide feedback before submitting.');
      return;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      message.warning('Please enter a valid email address.');
      return;
    }
    // Prepare data for EmailJS
    const templateParams = {
      from_name:"Kidus Panda ",
      rating: rating,
      message: `"send for a Image Alchemy" ${feedback}`,
      email: email,
      date: new Date().toISOString(), // Get current date and time in ISO format
      country: location.country,
      city: location.city,
    };
console.log(templateParams);

    // Send email using EmailJS
    emailjs
      .send(
        'service_mfqnqk2', // Replace with your EmailJS service ID
        'template_qgb3eur', // Replace with your EmailJS template ID
        templateParams,
        'rbdDW_W2j54GdWvYF' // Replace with your EmailJS user ID
      )
      .then(() => {
        // Show success message
        message.success('Thank you for your feedback!');

        // Reset the form
        setRating(0);
        setFeedback('');
        setEmail('');
        handleClose();
      })
      .catch(() => {
        message.error('Failed to send message.');
      });  
  };

  const handleClose = () => {
    setIsVisible(false); // Hide the feedback component
    localStorage.setItem('feedbackClosed', 'true'); // Store in local storage
  };

  const customIcons: { [key: number]: JSX.Element } = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  // If the component is not visible, return null
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed z-50 right-0 top-1/2 transform -translate-y-1/2 flex justify-center items-center m-1 rounded-3xl w-full md:w-2/5 lg:w-2/5 xl:w-2/5">
      <div className="w-full max-w-md p-4 md:p-6 bg-white rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
        title="Close"
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <CloseOutlined className="text-lg" />
        </button>
       <h4 className='text-center text-blue-700 text-6xl'><SmileOutlined /></h4>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">We Value Your Feedback</h2>
        <div className="mb-4 md:mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            How would you rate your experience?
          </label>
          <Rate
            allowHalf
            value={rating}
            character={({ index }: { index?: number }) => customIcons[(index ?? 0) + 1]}
            onChange={(value) => setRating(value)}
            className="text-2xl md:text-3xl bg-white"
          />
        </div>
        <div className="mb-4 md:mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4 md:mb-6">

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Your Feedback
          </label>
          <textarea
            className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Tell us more about your experience..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <Button
          type="primary"
          onClick={handleSubmit}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg"
        >
          Submit Feedback
        </Button>
      </div>
    </div>
  );
};

export default FeedbackComponent;