export default class Utils {
  public static months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  public static getMonth(billingMonth: number) {
    if (billingMonth < this.months.length) return this.months[billingMonth];
    else return this.months[11];
  }

  public static capitalize(value: string) {
    const split = value.split(' ');
    const result = split.map((value) => {
      let string = value.toLowerCase();
      const firstLetter = string.charAt(0);
      return firstLetter.toUpperCase() + string.slice(1);
    });
    return result.join(' ');
  }

  public static isCustomer(auth: User): auth is Customer {
    return auth.type === 'customer';
  }
}
