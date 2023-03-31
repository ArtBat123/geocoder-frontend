<template>
  <div id="chart" style="height: 600px; width: 100vh;">
  </div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
//import * as am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import worldLow from "@amcharts/amcharts5-geodata/worldLow";


export default {
  name: "geocoder",
  data() {
    return {
      pointSeries: null,
      chart: null,
    }
  },
  methods: {
    setAddress(title, latitude, longitude) {
      this.pointSeries.data.push({
        geometry: { type: "Point", coordinates: [longitude, latitude] },
        title: title
      });
      this.chart.animate({ key: "rotationX", to: -longitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
      this.chart.animate({ key: "rotationY", to: -latitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
    },
  },
  mounted() {
    const root = am5.Root.new("chart");

    this.chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "none",
        projection: am5map.geoOrthographic(),//geoMercator
      })
    );

    var polygonSeries = this.chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: worldLow
      })
    );
    console.log(polygonSeries);

    this.pointSeries = this.chart.series.push(am5map.MapPointSeries.new(root, {}));

    this.pointSeries.bullets.push(function () {
      var circle = am5.Circle.new(root, {
        radius: 10,
        tooltipY: 0,
        fill: am5.color(0xffba00),
        stroke: root.interfaceColors.get("background"),
        strokeWidth: 2,
        //tooltipText: "{title}",
        tooltipHTML: `<div style="width: 600px">{title}</div><strong>Координаты: {geometry.coordinates}</strong>`
      });

      return am5.Bullet.new(root, {
        sprite: circle
      });
    });
  }
}
</script>