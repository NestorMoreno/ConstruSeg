using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web.Mvc;

namespace ConstruccionSegura.Controllers
{
    /// <summary>
    /// Clase base de los controladores
    /// </summary>
    [HandleError]
    public class BaseController : Controller
    {

        #region Override

        /// <summary>
        /// Metodo de inicialización de las propiedades transversales a los controladores
        /// </summary>
        /// <param name="requestContext"></param>
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            const string culture = "es-CO";
            CultureInfo ci = CultureInfo.GetCultureInfo(culture);
            Thread.CurrentThread.CurrentCulture = ci;
            Thread.CurrentThread.CurrentUICulture = ci;
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
        }

        /// <summary>
        /// Capturar las excepciones generales de los controladores
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void OnException(ExceptionContext filterContext)
        {
            if (IsAjax(filterContext))
            {
                filterContext.Result = new JsonResult()
                {
                    Data = filterContext.Exception.Message,
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };

                filterContext.ExceptionHandled = true;
                filterContext.HttpContext.Response.Clear();
            }
            else
            {
                base.OnException(filterContext);
            }
        }

        #endregion

        #region Private methods

        /// <summary>
        /// Verfificar si el error es de una petición ajax
        /// </summary>
        /// <param name="filterContext"></param>
        /// <returns></returns>
        private bool IsAjax(ExceptionContext filterContext)
        {
            return filterContext.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest";
        }

        #endregion
    }

}