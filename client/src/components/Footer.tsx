import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <address className="not-italic">
              <p>212 W. May</p>
              <p>Yoakum, TX 77995</p>
              <p>P.O. Box 202</p>
              <p className="mt-2">
                <a href="tel:361-427-4002" className="hover:underline">
                  (361) 427-4002
                </a>
              </p>
            </address>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/movies" className="hover:underline">Movies & Showtimes</a>
              </li>
              <li>
                <a href="/about" className="hover:underline">About Us</a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/YoakumGrandTheater"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} The Grand Theater. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
