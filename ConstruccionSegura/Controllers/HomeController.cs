using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ConstruccionSegura.Models;
using Newtonsoft.Json.Linq;
using System.Web.Script.Serialization;

namespace ConstruccionSegura.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            ViewBag.dangerGroups = getDangerGroups();
            return View();
        }
        
        [HttpPost]
        public JsonResult GetDangers(int? id, int? idDangerGroup)
        {
            try
            {
                return Json(new { success = true, data = getDangers(id, idDangerGroup) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex }, JsonRequestBehavior.AllowGet); ;
            }
        }

        [HttpPost]
        public JsonResult GetEffects(int? id, int? idDanger)
        {
            try
            {
                return Json(new { success = true, data = getEffects(id, idDanger) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex }, JsonRequestBehavior.AllowGet); ;
            }
        }

        [HttpPost]
        public JsonResult GetRecommendations(int? id, int? idDanger)
        {
            try
            {
                return Json(new { success = true, data = getRecommendations(id, idDanger) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex }, JsonRequestBehavior.AllowGet); ;
            }
        }

        #region Private Methods

        private IEnumerable<SelectListItem> getDangerGroups() {
            try
            {
                using (var context = new Model())
                {
                    return context.grupospeligros.ToList().Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnGrupoPeligro.ToString() });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        private IEnumerable<SelectListItem> getDangers(int? id, int? idDangerGroup)
        {
            try
            {
                using (var context = new Model())
                {
                    if (idDangerGroup.HasValue)
                    {
                        return context.peligros.ToList().Where(p => p.idnGrupoPeligro == idDangerGroup).Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnPeligro.ToString() });
                    }
                    else
                    {
                        return context.peligros.ToList().Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnPeligro.ToString() });
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private IEnumerable<SelectListItem> getEffects(int? id, int? idDanger)
        {
            try
            {
                using (var context = new Model())
                {
                    if (idDanger.HasValue)
                    {
                        var allEffects = context.rpeligrosposiblesefectos.ToList().Where(p => p.idnPeligro == idDanger).ToList();
                        if (allEffects.Any())
                        {
                            var effects = context.posiblesefectos.ToList().Where(q => !allEffects.Any(y => y.idnPosibleEfecto == q.idnPosibleEfecto)).ToList();
                            return effects.Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnPosibleEfecto.ToString() }).ToList();
                        }
                        return null;
                    }
                    else
                    {
                        return context.posiblesefectos.ToList().Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnPosibleEfecto.ToString() });
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private IEnumerable<SelectListItem> getRecommendations(int? id, int? idDanger)
        {
            try
            {
                using (var context = new Model())
                {
                    if (idDanger.HasValue)
                    {
                        return context.recomendaciones.ToList().Where(p => p.idnPeligro == idDanger).Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnRecomendacion.ToString() });
                    }
                    else
                    {
                        return context.recomendaciones.ToList().Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnRecomendacion.ToString() });
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

    }
}