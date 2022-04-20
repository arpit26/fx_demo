/**
 * Describe Batchtestjs here.
 *
 * The exported method is the entry point for your code when the function is invoked.
 *
 * Following parameters are pre-configured and provided to your function on execution:
 * @param event: represents the data associated with the occurrence of an event, and
 *                 supporting metadata about the source of that occurrence.
 * @param context: represents the connection to Functions and your Salesforce org.
 * @param logger: logging handler used to capture application logs and trace specifically
 *                 to a given execution of a function.
 */

export default async function (event, context, logger) {
  let resultss = "";
  logger.info(
    `Invoking Batchtestjs with payload ${JSON.stringify(event.data || {})}`
  );
  const jsonrequest = JSON.parse(event.data.length);
  for (var i = 0; i < jsonrequest; i++) {
    const results = await context.org.dataApi.create({
      type: "Contact",
      fields: {
        FirstName: event.data[i].Name,
        LastName: "test2",
        AccountId: event.data[i].Id // Get the ReferenceId from previous operation
      }
    });
    resultss = resultss.concat(results);
  }
  logger.info(JSON.stringify(resultss));
  return resultss;
}
