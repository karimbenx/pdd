const axios = require('axios');
const cheerio = require('cheerio');

// URL for weather news section of Chennai on The Hindu
const url = 'https://www.thehindu.com/news/cities/chennai/weathernews';

const scrapeWeatherNews = async () => {
  try {
    const { data } = await axios.get(url);  // Fetch HTML content of the weather news page
    const $ = cheerio.load(data);  // Parse the HTML using cheerio

    const weatherArticles = [];

    // Loop through each article and extract relevant data
    $('article').each((index, element) => {
      const title = $(element).find('h2').text().trim();
      const link = $(element).find('a').attr('href');
      const summary = $(element).find('.story-card-details').text().trim();

      if (title && link) {
        weatherArticles.push({
          title,
          link: `https://www.thehindu.com${link}`,
          summary,
        });
      }
    });

    return weatherArticles;  // Return the scraped data
  } catch (error) {
    console.error('Error scraping weather news:', error);
    return [];  // Return an empty array if scraping fails
  }
};

module.exports = scrapeWeatherNews;
