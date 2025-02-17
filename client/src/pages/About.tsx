import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">About The Grand Theater</h1>
        <p className="text-xl text-muted-foreground">
          Your premier entertainment destination in Yoakum
        </p>
      </section>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              November 22, 2015, my husband and I bought The Grand building from
              Believers Christian Center. This has been something I have been trying
              to get my hands on for the last 15 years. The building needed a lot
              of work. Weaver and Jacobs Construction Company out of Cuero started
              construction in February and finished late August.
            </p>

            <p>
              We opened for business the 1st weekend in September 2016 and it has
              been everything that I thought it would be and more. I have the most
              AMAZING workers and they always strive to have the best customer
              service around.
            </p>

            <p>
              We try to have a variety of shows. I've hired Cinema Service out of
              Dallas to help me book all my shows. I absolute love my Booker. We
              work well together and she does what is best for us.
            </p>

            <p>
              With all this said, I could not and can not do this alone. It has
              taken lots of people to get us where we are today and I can not
              thank them enough.
            </p>

            <p>
              If you have not been to The Grand, come and visit us. We would love
              to have you.
            </p>

            <p className="font-medium">
              God Bless,<br />
              Tammy Steinmann
            </p>
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Theater Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Balcony Seating</h3>
              <p className="text-muted-foreground">
                Enjoy our premium balcony seating area with 35 comfortable seats.
                Must be 18+ to access.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Game Room</h3>
              <p className="text-muted-foreground">
                Visit our exciting Game Room featuring arcade games, food, and
                refreshments.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Special Events</h3>
              <p className="text-muted-foreground">
                Host birthday parties, private screenings, and business events at
                our theater.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
