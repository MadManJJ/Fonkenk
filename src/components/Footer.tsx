'use client'
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-gray-900 text-white py-10 mt-16">
      <div className="container mx-auto text-center">
        {/* Contact Section */}
        <div className="space-y-6">
          <h3 className="text-3xl font-semibold">Contact Us</h3>
          <p className="text-lg text-gray-400">Feel free to reach out for any inquiries or support!</p>

          <div className="flex justify-center space-x-12">
            {/* Dummy contact info */}
            <div className="space-y-2 text-gray-300">
              <p className="text-lg">Phone: +1 (555) 123-4567</p>
              <p className="text-lg">Email: info@fonkenkdev.com</p>
            </div>

            {/* Links Section */}
            <div className="space-y-2 text-gray-300">
              <Link href="/about" className="text-cyan-500 hover:text-cyan-400 transition duration-300">About Us</Link>
              <Link href="/privacy-policy" className="text-cyan-500 hover:text-cyan-400 transition duration-300">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-cyan-500 hover:text-cyan-400 transition duration-300">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="mt-8">
          <p className="text-sm text-gray-500">© 2025 Fonkenk Massage. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
