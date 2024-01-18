class Utils {
  getToday = () => Intl.DateTimeFormat().format(new Date());
}

export default new Utils();
