const siteURL = process.env.NODE_ENV === 'production' ? 'http://vcm-3422.vm.duke.edu' : 'http://localhost';
const postFix = process.env.NODE_ENV === 'production' ? '/api' : ':1717';

module.exports = {
  blogName: 'Bill Yu\'s Blog',
  githubLink: 'https://github.com/billhanyu/',
  pageCount: 2,
  paginationDisplayCount: 5,
  baseURL: `${siteURL}${postFix}`,
  siteURL,
};
