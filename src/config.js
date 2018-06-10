const siteURL = process.env.NODE_ENV === 'production' ? 'http://vcm-3422.vm.duke.edu' : 'http://localhost';

module.exports = {
  blogName: 'Bill Yu\'s Blog',
  githubLink: 'https://github.com/billhanyu/',
  pageCount: 2,
  paginationDisplayCount: 5,
  baseURL: `${siteURL}/api`,
  siteURL,
};
