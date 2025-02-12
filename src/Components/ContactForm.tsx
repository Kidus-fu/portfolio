import { FacebookFilled, InstagramOutlined, LinkedinFilled, TwitterCircleFilled } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useState, ChangeEvent } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion"; // Import motion from Framer Motion
interface FormData {
    name: string;
    email: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
        
    });
    const [status, setStatus] = useState<string>('');

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        setStatus('Sending...');
      
        emailjs.send(
          'service_mfqnqk2',   
          'template_qgb3eur',  
          { 
            froma_name:formData.name,
            message:`"send for a Portfoilo" ${formData.message}`,
            email: formData.email,
            subject: 'New message from my website',
           },
          'rbdDW_W2j54GdWvYF'    
        )
        .then(() => {
          setStatus('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        })
        .catch(() => setStatus('Failed to send message.'));
      };

    return (
        <div className=" " id="contact">
            <div className="px-2 sm:px-2 lg:px-8 pt-5 text-center">
                <p className=" pb-2 text-base max-w-2xl text-center m-auto ">
                    Want to contact me? Choose an option below and we'll be happy to show you
                    how I can transform your web experience.
                </p>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 grid md:grid-cols-2 lg:grid-cols-2 gap-y-8 md:gap-x-8 md:gap-y-8 lg:gap-x-8 lg:gap-y-16">
                {/* Contact Information Section */}
                <div>
                    <h2 className="text-lg font-bold ">Contact Me</h2>
                    <p className="max-w-sm mt-4 mb-4 ">
                        Have something to say? I'm here to help. Fill up the form or send email or call phone.
                    </p>

                    {/* Address */}
                    <div className="flex items-center mt-8 space-x-2 text-dark-600 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                        </svg>
                        <span>Adama Kable 15</span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center mt-2 space-x-2 text-dark-600 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <a href="mailto:seeh51593@gamil.com">seeh51593@gamil.com</a>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center mt-2 space-x-2 text-dark-600 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        <a href="tel:+251930980499">+251 910 980 499 </a>
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <div className="fixed sm:inline-block top-2/4  flex-1 right-10 animate-pulse hover:animate-none shadow-2xl ">
                        <motion.a  
                        
                        href="https://www.facebook.com/adama.kable" target="_blank" className="text-blue-700 hover:text-blue-900 "><FacebookFilled className='p-2  transform delay-75 text-xl hover:scale-105 hover:shadow-sm border rounded-full border-opacity-40 ' /></motion.a>
                        <br />
                        <motion.a href="https://www.twitter.com/adamakable" target="_blank" className="text-blue-700 hover:text-blue-900"><TwitterCircleFilled className='p-2  transform delay-75 text-xl hover:scale-105 hover:shadow-sm border rounded-full border-opacity-40 ' /></motion.a>
                        <br />
                        <motion.a href="#" target="_blank" className="text-red-500  hover:text-red-600"><InstagramOutlined className='p-2  transform delay-75 text-xl hover:scale-105 hover:shadow-sm border rounded-full border-opacity-40 ' /></motion.a>
                        <br />
                        <motion.a href="https://www.linkedin.com/in/kidus-panda/" target="_blank" className="text-blue-700 hover:text-blue-900"><LinkedinFilled className='p-2  transform delay-75 text-xl hover:scale-105 hover:shadow-sm border rounded-full border-opacity-40 ' /></motion.a>
                        <br />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Input type="checkbox" id="botcheck" className="hidden" name="botcheck" />

                        <div className="mb-5">
                            <Input
                                type="text"
                                placeholder="Full Name"
                                autoComplete="off"
                                className="w-full px-4 py-3 border-2 placeholder:text-gray-800  rounded-md outline-none   focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100  "
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="email_address" className="sr-only">Email Address</label>
                            <Input
                                id="email_address"
                                type="email"
                                placeholder="Email Address"
                                autoComplete="off"
                                className="w-full px-4 py-3 border-2 placeholder:text-gray-800  rounded-md outline-none  border-gray-300 focus:border-gray-600 ring-gray-100 "
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <textarea
                                placeholder="Your Message"
                                className="w-full px-4 py-3 border-2 placeholder:text-gray-800 0 rounded-md outline-none h-36 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 "
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 font-semibold text-white transition-colors bg-blue-950 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 "
                            disabled={status === 'Sending...'}
                        >
                            {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                        </button>

                        {status && !status.includes('Sending...') && (
                            <p className={`mt-4 text-center ${status.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                                {status}
                            </p>
                        )}
                    </form>

                </div>

            </div>

        </div>
    );
};

export default ContactForm;